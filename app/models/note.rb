class Note < ApplicationRecord
    has_many :tags
    has_many :collections, through: :tags
end
