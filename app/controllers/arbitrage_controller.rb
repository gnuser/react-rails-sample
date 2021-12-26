class ArbitrageController < ApplicationController
  before_action :set_beer, only: %i[show edit update destroy]

  # GET /arbitrage or /arbitrage.json
  def index
  end
end
