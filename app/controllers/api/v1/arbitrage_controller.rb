class Api::V1::ArbitrageController < ApplicationController
  before_action :set_beer, only: [:show, :edit, :update, :destroy]
  # GET /beers
  # GET /beers.json
  def index
    @spreads = Spread.list
    render json: @spreads
  end
end
