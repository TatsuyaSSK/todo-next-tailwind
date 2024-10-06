Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"
      resources :problems, only: [:index, :show, :create, :update, :destroy]
      namespace :problem do
        resources :search, only: [:index]
      end
    end
  end
end
