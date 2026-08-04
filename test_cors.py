import requests

try:
    r = requests.options("https://resumatch-backend-22e5.onrender.com/api/v1/optimize", headers={"Origin": "https://resumatch-frontend-vx5j.onrender.com", "Access-Control-Request-Method": "POST"})
    print("Status:", r.status_code)
    print("Headers:", r.headers)
except Exception as e:
    print("Error:", e)
