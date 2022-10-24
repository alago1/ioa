def lambda_handler(event, context):
    # TODO implement
    # return event
    method = event["requestContext"]["http"]["method"]
    if method == "GET":
        return "Received a [GET] request"
    if method == "POST":
        return f"Received a [POST] request with body {event['body']}"
    return "Neither a GET or POST request"
