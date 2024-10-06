class Api::V1::Problem::SearchController < ApplicationController
  def index
    render json: { message: "success #{params[:q]} search!" }, status: :ok
  end
end
