class Api::V1::HealthCheckController < Api::V1::BaseController
  def index
    render json: { message: "success health check!" }, status: :ok
  end
end
