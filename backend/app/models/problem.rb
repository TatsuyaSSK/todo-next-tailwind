class Problem < ApplicationRecord
  has_many :blank_indices, dependent: :destroy
  enum :blank_type, {random: 1, noun: 2, verb: 3, adjective: 4, adverb: 5, preposition: 6}
  validates :title, :english_text, :blank_type, presence: true
end
