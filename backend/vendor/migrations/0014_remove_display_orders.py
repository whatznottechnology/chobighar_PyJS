from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('vendor', '0006_vendorprofile_love_count_vendorprofile_stats_count_and_more'),  # Using the last actual migration
    ]

    operations = [
        migrations.RemoveField(
            model_name='vendorcategory',
            name='display_order',
        ),
        migrations.RemoveField(
            model_name='vendorsubcategory',
            name='display_order',
        ),
        migrations.RemoveField(
            model_name='vendorimage',
            name='display_order',
        ),
        migrations.RemoveField(
            model_name='vendorvideo',
            name='display_order',
        ),
        migrations.RemoveField(
            model_name='vendorservice',
            name='display_order',
        ),
        migrations.RemoveField(
            model_name='vendorspecialty',
            name='display_order',
        ),
        migrations.RemoveField(
            model_name='vendorhighlight',
            name='display_order',
        ),
        migrations.RemoveField(
            model_name='vendorpackage',
            name='display_order',
        ),
        migrations.RemoveField(
            model_name='vendorportfolio',
            name='display_order',
        ),
        migrations.AlterModelOptions(
            name='vendorcategory',
            options={'verbose_name': 'Vendor Category', 'verbose_name_plural': 'Vendor Categories', 'ordering': ['name']},
        ),
        migrations.AlterModelOptions(
            name='vendorsubcategory',
            options={'verbose_name': 'Vendor Subcategory', 'verbose_name_plural': 'Vendor Subcategories', 'ordering': ['name']},
        ),
        migrations.AlterModelOptions(
            name='vendorimage',
            options={'verbose_name': 'Vendor Image', 'verbose_name_plural': 'Vendor Images', 'ordering': ['image_type']},
        ),
        migrations.AlterModelOptions(
            name='vendorvideo',
            options={'verbose_name': 'Vendor Video', 'verbose_name_plural': 'Vendor Videos'},
        ),
        migrations.AlterModelOptions(
            name='vendorservice',
            options={'verbose_name': 'Vendor Service', 'verbose_name_plural': 'Vendor Services', 'ordering': ['name']},
        ),
        migrations.AlterModelOptions(
            name='vendorspecialty',
            options={'verbose_name': 'Vendor Specialty', 'verbose_name_plural': 'Vendor Specialties', 'ordering': ['name']},
        ),
        migrations.AlterModelOptions(
            name='vendorhighlight',
            options={'verbose_name': 'Vendor Highlight', 'verbose_name_plural': 'Vendor Highlights'},
        ),
        migrations.AlterModelOptions(
            name='vendorpackage',
            options={'verbose_name': 'Vendor Package', 'verbose_name_plural': 'Vendor Packages', 'ordering': ['name']},
        ),
        migrations.AlterModelOptions(
            name='vendorportfolio',
            options={'verbose_name': 'Vendor Portfolio', 'verbose_name_plural': 'Vendor Portfolio Items', 'ordering': ['-created_at']},
        ),
    ]