FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app
EXPOSE 8080

#copy .csproj and restore as distinct layers
COPY "nuwmtube.sln" "nuwmtube.sln"
COPY "Nuwmtube.WebApi/Nuwmtube.WebApi.csproj" "Nuwmtube.WebApi/Nuwmtube.WebApi.csproj"
COPY "Nuwmtube.Application/Nuwmtube.Application.csproj" "Nuwmtube.Application/Nuwmtube.Application.csproj"
COPY "Nuwmtube.Persistence/Nuwmtube.Persistence.csproj" "Nuwmtube.Persistence/Nuwmtube.Persistence.csproj"
COPY "Nuwmtube.Domain/Nuwmtube.Domain.csproj" "Nuwmtube.Domain/Nuwmtube.Domain.csproj"
COPY "Nuwmtube.Infrastructure/Nuwmtube.Infrastructure.csproj" "Nuwmtube.Infrastructure/Nuwmtube.Infrastructure.csproj"

RUN dotnet restore "nuwmtube.sln"

#copy everything else build
COPY . .
WORKDIR /app
RUN dotnet publish -c Release -o out

#build a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "Nuwmtube.WebApi.dll" ]