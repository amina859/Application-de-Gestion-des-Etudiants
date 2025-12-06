from django.db import models

# Create your models here.
class Etudiant(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telephone = models.CharField(max_length=15, unique=True, default='0000000000')
    num_carte = models.CharField(max_length=20, unique=True, default='NE000')

    def __str__(self):
        return f"{self.prenom} {self.nom}"
