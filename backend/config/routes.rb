Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "letter_opener" if Rails.env.development?
  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"
      mount_devise_token_auth_for 'User', at: 'auth'
      resources :problems, only: [:index, :show, :create, :update, :destroy]
      namespace :problem do
        resources :search, only: [:index]
      end
      namespace :current do
        resource :user, only: [:show]
        end
      end
    end
  end
