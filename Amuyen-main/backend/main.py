#--------------------------------------------------------------------
# Instalar con pip install Flask
from flask import Flask, request, jsonify, abort
from flask import request

# Instalar con pip install flask-cors
from flask_cors import CORS

# Instalar con pip install mysql-connector-python
import mysql.connector

# Si es necesario, pip install Werkzeug
from werkzeug.utils import secure_filename

# No es necesario instalar, es parte del sistema standard de Python
import os
import time
#--------------------------------------------------------------------



app = Flask(__name__)
CORS(app)  # Esto habilitará CORS para todas las rutas

#--------------------------------------------------------------------
class Cliente:
    #----------------------------------------------------------------
    # Constructor de la clase
    def __init__(self, host, user, password, database):
        # Primero, establecemos una conexión sin especificar la base de datos
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        self.cursor = self.conn.cursor()

        # Intentamos seleccionar la base de datos
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            # Si la base de datos no existe, la creamos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err

        # Una vez que la base de datos está establecida, creamos la tabla si no existe
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS clientes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(55) NOT NULL,
            apellido VARCHAR(55) NOT NULL,
            comentario VARCHAR(255) NULL)''')
        self.conn.commit()

        # Cerrar el cursor inicial y abrir uno nuevo con el parámetro dictionary=True
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)
        
    #----------------------------------------------------------------
    def agregar_cliente(self, nombre, apellido, comentario):
        # Verificamos si ya existe un producto con el mismo código
        if self.consultar_cliente(nombre,apellido):
          return False

        sql = "INSERT INTO clientes (nombre, apellido, comentario) VALUES (%s, %s, %s)"
        valores = (nombre, apellido, comentario)

        self.cursor.execute(sql, valores)        
        self.conn.commit()
        return True

    #----------------------------------------------------------------
    def consultar_cliente(self, nombre, apellido):
        # Consultamos un cliente a partir de su id
        self.cursor.execute(f"SELECT * FROM clientes WHERE nombre = '{nombre}' and apellido = '{apellido}'")
        return self.cursor.fetchone()

    #----------------------------------------------------------------
    def modificar_cliente(self, id, nombre, apellido, comentario):
        sql = "UPDATE clientes SET nombre = %s, apellido = %s, comentario = %s, imagen_url = %s WHERE id = %s"
        valores = (nombre, apellido, comentario, id)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0

    #----------------------------------------------------------------
    def listar_clientes(self):
        self.cursor.execute("SELECT * FROM clientes")
        clientes = self.cursor.fetchall()
        return clientes

    #----------------------------------------------------------------
    def eliminar_cliente(self, id):
        # Eliminamos un cliente de la tabla a partir de su id
        self.cursor.execute(f"DELETE FROM clientes WHERE id = {id}")
        self.conn.commit()
        return self.cursor.rowcount > 0

    #----------------------------------------------------------------
    def mostrar_cliente(self, id):
        # Mostramos los datos de un cliente a partir de su id
        cliente = self.consultar_cliente(id)
        if cliente:
            print("-" * 40)
            print(f"Id.....: {cliente['id']}")
            print(f"Nombre: {cliente['nombre']}")
            print(f"Apellido...: {cliente['apellido']}")
            print(f"Comentario.....: {cliente['comentario']}")
            print("-" * 40)
        else:
            print("Cliente no encontrado.")
            
#--------------------------------------------------------------------
# Cuerpo del programa
#--------------------------------------------------------------------
# Crear una instancia de la clase Catalogo
cliente = Cliente(host='localhost', user='root', password='', database='miapp')
##cliente = Cliente(host='amuyen.mysql.pythonanywhere-services.com', user='amuyen', password='Comentario2023', database='amuyen$db_clientes')


#--------------------------------------------------------------------
@app.route("/clientes", methods=["GET"])
def listar_clientes():
    clientes = cliente.listar_clientes()
    return jsonify(clientes)

#--------------------------------------------------------------------

@app.route("/clientes", methods=["POST"])
def agregar_cliente():
    nombre = request.form['nombre']
    apellido = request.form['apellido']
    comentario = request.form['comentario']

    if cliente.agregar_cliente(nombre, apellido, comentario):
        return jsonify({"mensaje": "Comentario agregado"}), 201
    else:
        return jsonify({"mensaje": "El comentario ya existe"}), 400

#--------------------------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True)      