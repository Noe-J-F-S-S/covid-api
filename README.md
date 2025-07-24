version: "3.8"
services:
  postgres:
    image: postgres
    restart: always
    environment:
      POSTGRES_DB: positivos_covid    # Nombre de la base de datos que deseas usar
      POSTGRES_USER: root    # Usuario de la base de datos
      POSTGRES_PASSWORD: root # Contraseña del usuario de la base de datos
    ports:
      - "5432:5432"          # Mapea el puerto 5432 del contenedor al puerto 5432 del host
    volumes:
      - "./postgres_data:/var/lib/postgresql/data" # Monta el volumen para persistir datos
  
  pgadmin:  
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: "admin@admin.com"
      PGADMIN_DEFAULT_PASSWORD: "admin"
    ports:
      - "80:80"              #Mapea el puerto 80 del contenedor al puerto 80 del host
    depends_on:
      - postgres             #Asegura que el servicio pgadmin se inicie después de postgres
  postgrest:
    image: postgrest/postgrest
    ports:
      - "3000:3000"
    environment:
      PGRST_DB_URI: postgres://root:root@postgres:5432/positivos_covid
      PGRST_DB_ANON_ROLE: anon
      PGRST_DB_SCHEMA: public
    depends_on:
      - postgres
