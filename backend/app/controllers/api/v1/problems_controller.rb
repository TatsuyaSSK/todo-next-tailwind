class Api::V1::ProblemsController < ApplicationController
  def index
    problems = Problem.order(created_at: :desc)
    render json: problems
  end
end
