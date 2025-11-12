pipeline {
   agent any

   stages {
        // Parar todos los servicios
        stage('Parando los servicios') {
            steps {
                bat '''
                    docker compose -p adj-demo-main down || exit /b 0
                '''
            }
        }

        // Eliminar las imágenes anteriores
        stage('Borrando imágenes antiguas') {
            steps {
                bat '''
                    for /f "tokens=*" %%i in ('docker images --filter "label=com.docker.compose.project=adj-demo-main" -q') do (
                        docker rmi %%i
                    )
                    if errorlevel 1 (
                        echo No hay imágenes por borrar...
                    )
                '''
            }
        }

        // Bajar la actualización
        stage('Actualizando...') {
            steps {
                checkout scm
            }
        }

        // Levantar y desplegar el proyecto
        stage('Construyendo y desplegando...hub') {
            steps {
                bat '''
                    docker compose up --build -d
                '''
            }
        }
   }

   post {
      success {
        echo 'Pipeline ejecutado exitosamente'
      }

      failure {
        echo 'Error al ejecutar el pipeline'
      }

      always {
        echo 'Pipeline finalizado'
      }
   }
}