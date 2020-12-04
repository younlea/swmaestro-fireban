from fireban import settings
from jwt import decode

def get_authorization_header(request):
    # header 에 포함된 token을 디크립트 한 후에 user_id 를 받아옴
    auth = request.META.get('HTTP_AUTHORIZATION', b'')
    auth = auth.split(' ')[1]
    payload = decode(auth, settings.SECRET_KEY)
    return payload['user_id']