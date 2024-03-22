from django.db import models
from datetime import timedelta
from dateutil.relativedelta import relativedelta


class Categoria(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome


class Banco(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome


class Transacao(models.Model):
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    descricao = models.CharField(max_length=200)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data = models.DateField()
    banco = models.ForeignKey(Banco, on_delete=models.CASCADE)
    parcelas = models.PositiveIntegerField(default=1)
    parcela_atual = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.descricao} - Parcela {self.parcela_atual}/{self.parcelas} - {self.valor}"

    def save(self, *args, **kwargs):
        return super().save(*args, **kwargs)


class ReceitaFinanceira(models.Model):
    descricao = models.CharField(max_length=100)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data = models.DateField()

    def __str__(self):
        return self.descricao


class Parcela(models.Model):
    transacao = models.ForeignKey(Transacao, on_delete=models.CASCADE)
    numero = models.PositiveIntegerField()
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data_vencimento = models.DateField()

    def __str__(self):
        return f"{self.transacao.descricao} - Parcela {self.numero}"

    @classmethod
    def criar_parcelas(cls, transacao):
        valor_parcela = transacao.valor / transacao.parcelas
        data_parcela = transacao.data
        for parcela_numero in range(1, transacao.parcelas + 1):
            Parcela.objects.create(
                transacao=transacao,
                numero=parcela_numero,
                valor=valor_parcela,
                data_vencimento=data_parcela
            )
            # Adicionando um mês para a próxima parcela
            data_parcela += relativedelta(months=1)

