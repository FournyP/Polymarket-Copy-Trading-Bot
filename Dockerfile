# Stage 1: Build the Rust application (stable with edition 2024 support)
FROM rust:1.92-slim AS builder

# Install required build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy manifests
COPY Cargo.toml ./

# Copy source code
COPY src ./src

# Build for release with optimizations
RUN cargo build --release --bin pm_bot

# Stage 2: Runtime image
FROM debian:bookworm-slim

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user for security
RUN useradd -m -u 1000 appuser

# Create app directory and data directory
WORKDIR /app
RUN mkdir -p /app/data && chown -R appuser:appuser /app

# Copy the binary from builder
COPY --from=builder /app/target/release/pm_bot /app/pm_bot

# Provide empty .env so dotenv() finds a file (actual values should be injected via env vars)
RUN touch /app/.env && chown appuser:appuser /app/.env

# Copy configuration files if any (optional, can be mounted as volumes)
# COPY config/ ./config/

# Switch to non-root user
USER appuser

# Expose any ports if needed (uncomment and adjust as needed)
# EXPOSE 8080

# Set the startup command
CMD ["/app/pm_bot"]
