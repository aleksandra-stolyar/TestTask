class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    super
  end

  def destroy
    super
  end

end