from django.shortcuts import render
from rest_framework import viewsets
from .models import Etudiant
from .serializers import EtudiantSerializer

# Create your views here.
class EtudiantViewSet(viewsets.ModelViewSet):
    queryset = Etudiant.objects.all()
    serializer_class = EtudiantSerializer

