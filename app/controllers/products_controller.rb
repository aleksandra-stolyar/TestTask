class ProductsController < ApplicationController
  load_and_authorize_resource

  def index
    # binding.pry
    # @products = Product.page(params[:page]).per(8)
    render json: @products
  end

  def paginate
    @total_count = Product.all.count
    @products = Product.order(created_at: :desc).page(params[:page]).per(params[:quantity])
    render json: {products: @products, total_count: @total_count}
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      render json: {product: @product, message: I18n.t('product.create.success'), status: 201}
    else
      render json: {message: I18n.t('product.create.error'), status: 500}
    end
  end

  def update
    @product.update_attributes(product_params)
    binding.pry
    if @product.save
      render json: {message: I18n.t('product.update.success'), status: 201}
    else
      render json: {message: I18n.t('product.update.error'), status: 500}
    end
  end

  def destroy
  end

  private

  def product_params
    params.permit(:name, :price, :details, :page, :quantity)
  end
end
