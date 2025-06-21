from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('authority', '0014_delete_mymodel_customuser_can_manage_users'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='role',
            field=models.CharField(
                max_length=20,
                choices=[('admin', 'Admin'), ('superadmin', 'Super Admin'), ('user', 'User')],
                default='user'
            ),
        ),
    ]
