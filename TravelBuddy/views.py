from django.shortcuts import render
from .models import MyModel
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


def index(request):
    return render(request, 'index.html') 

class Message(APIView):
    def post(self, request):
        data = request.data
        print("received message", data.get("message"))

        return Response({"msg": data["message"]}, status = status.HTTP_201_CREATED)
