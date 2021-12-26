class Spread
  include Redis::Objects
  class << self
    def list
      currencies = %w[CRO WBTC WETH SHIB]
      list = []
      currencies.each do |currency|
        spread = Redis::Objects.redis.get(currency)
        list << parse(currency, spread) if spread
      end
      list
    end

    def parse(currency, spread)
      info_list = spread.split("-")
      {
        currency: currency,
        buy_price: info_list[0],
        sell_price: info_list[1],
        exchange_price: info_list[2],
        diff: info_list[3],
        message: info_list[4]
      }
    end
  end
end
