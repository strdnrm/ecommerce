FROM golang:1.19-alpine

WORKDIR /ecommercenew

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o main ./cmd/apiserver/ 

CMD ["./main"]