FROM golang:1.22-alpine AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /out/api ./cmd/api

FROM alpine:3.22
RUN addgroup -S app && adduser -S app -G app && mkdir -p /app/data && chown -R app:app /app
USER app
WORKDIR /app
COPY --from=build /out/api ./api
EXPOSE 8080
CMD ["./api"]
