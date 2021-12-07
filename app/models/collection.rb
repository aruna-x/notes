class Collection < ApplicationRecord
  belongs_to :user
  has_many :tags
  has_many :notes, through: :tags
end
