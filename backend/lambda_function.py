import os
from os import path
import time
import fcntl
import json
from datetime import datetime

IOA_READING_PATH = "/mnt/ioa"


def get_readings(max_entries):
    files = sorted(
        [
            p
            for p in os.listdir(IOA_READING_PATH)
            if path.isfile(path.join(IOA_READING_PATH, p))
        ],
        reverse=True,
    )

    readings = []
    for fpath in files:
        if len(readings) >= max_entries:
            break

        p = path.join(IOA_READING_PATH, fpath)
        with open(p, "r") as f:
            fcntl.flock(f, fcntl.LOCK_SH)
            readings_by_time = sorted(json.load(f), key=lambda x: -x["timestamp"])
            readings.extend(readings_by_time)
            fcntl.flock(f, fcntl.LOCK_UN)

    if len(readings) > max_entries:
        readings = readings[:max_entries]

    return readings


def publish_reading(reading_obj):
    latest_reading = max(
        (
            p
            for p in os.listdir(IOA_READING_PATH)
            if path.isfile(path.join(IOA_READING_PATH, p))
        ),
        default="",
    )

    t = time.gmtime(reading_obj["timestamp"])
    new_reading = time.strftime("%Y_%m_%d_%H.json", t)

    latest_file = path.join(IOA_READING_PATH, max(latest_reading, new_reading))
    if new_reading == latest_reading:
        with open(latest_file, "r") as f:
            fcntl.flock(f, fcntl.LOCK_SH)
            hour_readings = json.load(f)
            fcntl.flock(f, fcntl.LOCK_UN)
    else:
        hour_readings = []

    hour_readings.append(reading_obj)

    with open(latest_file, "w") as f:
        fcntl.flock(f, fcntl.LOCK_EX)
        json.dump(hour_readings, f)
        fcntl.flock(f, fcntl.LOCK_UN)


def lambda_handler(event, context):
    method = event["requestContext"]["http"]["method"]
    if method == "GET":
        path_param_obj = (
            "pathParameters" if "pathParameters" in event else "queryStringParameters"
        )
        try:
            max_entries = event[path_param_obj].get("number_entries", 5)
            max_entries = max(int(max_entries), 1)
        except:
            max_entries = 5

        return get_readings(max_entries)
    elif method == "POST":
        try:
            reading = json.loads(event["body"])
        except:
            return "Invalid Body"

        if "timeEpoch" not in event["requestContext"]:
            reading["timestamp"] = datetime.now().timestamp()
        else:
            reading["timestamp"] = event["requestContext"]["timeEpoch"] / 1000

        if "moisture" not in reading:
            reading["moisture"] = 0.0

        if "profile" not in reading:
            reading["profile"] = None

        reading_obj = {
            "timestamp": reading["timestamp"],
            "moisture": reading["moisture"],
            "profile": reading["profile"],
        }

        publish_reading(reading_obj)
        return "OK"
    elif method == "DELETE":
        file = event["body"]
        os.remove(f"/mnt/ioa/{file}")
        return f"OK. DELETED /mnt/ioa/{file}"
    elif method == "PUT":
        return os.listdir(IOA_READING_PATH)
    elif method == "PATCH":
        file = event["body"]
        with open(f"/mnt/ioa/{file}", "r") as f:
            fcntl.flock(f, fcntl.LOCK_SH)
            a = f.read()
            fcntl.flock(f, fcntl.LOCK_UN)
        return a
    else:
        return "Unsupported"
