class Api::V1::ProblemsController < ApplicationController
  def index
    problems = Problem.order(created_at: :desc)
    render json: problems
  end

  def create
    @problem = Problem.create!(problem_params)
    render json: @problem
  end

  private

  def problem_params
    params.require(:problem).permit(:title, :english_text, :japanese_text, :correct_answer_rate, :blank_type, :blank_rate)
  end
end
