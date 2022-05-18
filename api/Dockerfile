FROM python:3.9

WORKDIR /api

COPY requirements.txt /api

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . .
EXPOSE 5000