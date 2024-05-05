from django.shortcuts import render
from .models import MyModel
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import google.generativeai as genai
from .const import gemini_api_key



def index(request):
    return render(request, 'index.html') 

class Message(APIView):
    def post(self, request):
        data = request.data
        msg = data.get("message")
        print("received message", msg)
        genai.configure(api_key=gemini_api_key)
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(msg)
        print("Gemini Response:", response.candidates[0].content.parts[0].text)
        return Response({"message": response.candidates[0].content.parts[0].text}, status = status.HTTP_201_CREATED)
