Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'users/registrations', sessions: "users/sessions" }

  root "application#angular"

  resources :products do
    collection do
      get '/:page/:quantity', to: 'products#paginate'
      delete 'delete_multiple'
    end
  end

  resource :profile, only: [:edit] do
    collection do
      patch 'update_password'
      get 'user_search'
    end
  end

  get "*path" => "application#angular"

end
