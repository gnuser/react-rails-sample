class Api::V1::ArbitrageController < ApplicationController
  before_action :set_beer, only: [:show, :edit, :update, :destroy]
  # GET /beers
  # GET /beers.json
  def index
    @beers = Beer.all.order(brand: :asc)
    render json: @beers
  end
end
