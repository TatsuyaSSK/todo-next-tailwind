class Api::V1::Problem::SearchController < Api::V1::BaseController
  before_action :authenticate_user!
  
  def index
    @search_results = current_user.problems.search(params[:q] || "", hitsPerPage: 10)
    render json: {problems: @search_results}
  end
end
