class Api::V1::ProblemsController < ApplicationController
  def index
    problems = Problem.order(created_at: :desc)
    render json: problems
  end

  def create

    DeepL.configure do |config|
      config.auth_key = Rails.application.credentials.deepl_key
      config.host = 'https://api-free.deepl.com'
    end
    translation = DeepL.translate(params[:problem][:english_text], "EN", "JA")
    @problem = Problem.new(problem_params.merge(japanese_text: translation.text))
    @problem.transaction do
      @problem.save!
      for i in params[:blank_indices] do
        BlankIndex.create!(problem_id: @problem.id, index: i)
      end
    end
    render json: @problem
  end

  def show
    @problem = Problem.find(params[:id])
    render json: {
      problem: @problem,
      blank_indices: @problem.blank_indices.as_json(only: [:index])
    }
  end

  def update
    @problem = Problem.find(params[:id])
    @problem.update(correct_answer_rate: params[:correct_answer_rate])
    render json: @problem
  end

  private

  def problem_params
    params.require(:problem).permit(:title, :english_text, :correct_answer_rate, :blank_type, :blank_rate)
  end
end
