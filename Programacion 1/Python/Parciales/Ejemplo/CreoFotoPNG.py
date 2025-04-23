from PIL import Image

# Crear una imagen vacía de 96x96 con fondo transparente
img = Image.new('RGBA', (96, 96), (0, 0, 0, 0))

# Guardar la imagen
img.save('C:\\Users\\TuUsuario\\Desktop\\imagen_vacia.png')