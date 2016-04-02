class ProductsController < ApplicationController
  load_and_authorize_resource

  def index
    render json: @projects
  end

  def create
  end

  def update
  end

  def destroy
  end
end
