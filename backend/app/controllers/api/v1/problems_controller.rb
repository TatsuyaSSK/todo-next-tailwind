class Api::V1::ProblemsController < Api::V1::BaseController
  include Pagination
  before_action :set_problem, only: [:show, :update, :destroy]

  def index
    problems = get_problem(params).page(params[:page] || 1).per(10)
    render json: {problems: problems, meta: pagination(problems)}
  end

  def create
    DeepL.configure do |config|
      config.auth_key = Rails.application.credentials.deepl_key
      config.host = 'https://api-free.deepl.com'
    end
    translation = DeepL.translate(params[:english_text], "EN", "JA")
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
    render json: {
      problem: @problem,
      blank_indices: @problem.blank_indices.as_json(only: [:index])
    }
  end

  def update
    @problem.update(correct_answer_rate: params[:correct_answer_rate])
    render json: @problem
  end

  def destroy
    @problem.destroy
  end

  private

  def set_problem
    @problem = Problem.find(params[:id])
  end

  def problem_params
    params.permit(:title, :english_text, :correct_answer_rate, :blank_type, :blank_rate)
  end

  def get_problem(params)
    return Problem.title_desc if (params[:sort] == "title" && params[:direction] == "DESC")
    return Problem.title_asc if (params[:sort] == "title" && params[:direction] == "ASC")
    return Problem.high_rate if (params[:sort] == "correct_answer_rate" && params[:direction] == "DESC")
    return Problem.low_rate if (params[:sort] == "correct_answer_rate" && params[:direction] == "ASC")
    return Problem.latest if (params[:sort] == "created_at" && params[:direction] == "DESC")
    return Problem.oldest if (params[:sort] == "created_at" && params[:direction] == "ASC")
    return Problem.default
  end
end
