class Api::V1::HealthCheckController < ApplicationController
  def index
    render json: { message: "success health check!" }, status: :ok
  end
end
