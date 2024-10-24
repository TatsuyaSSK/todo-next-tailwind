class Api::V1::Problem::SearchController < Api::V1::BaseController
  def index 
    @search_results = Problem.search(params[:q] || "", hitsPerPage: 10)
    render json: {problems: @search_results}
  end
end
