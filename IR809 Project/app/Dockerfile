FROM alpine:latest
RUN apk add --no-cache python3 py3-lxml py-pip py3-paho-mqtt
RUN apk add --update openssl && \
    rm -rf /var/cache/apk/*
ADD ca-certificates.crt / 
COPY ca-certificates.crt /etc/ssl/certs  
ENV CERT_DIR "/etc/ssl/certs"
VOLUME ["$CERT_DIR"] 
ADD ir809.py /
CMD ["python3", "./ir809.py"]
