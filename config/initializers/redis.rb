# frozen_string_literal: true

if File.exist? Rails.root.join("config/redis.yml")
  threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }

  pool = ConnectionPool.new(size: threads_count.to_i, timeout: 5) {
    Redis.new Rails.application.config_for(:redis)
  }

  Redis::Objects.redis = pool
end
