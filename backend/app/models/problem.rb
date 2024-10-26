class Problem < ApplicationRecord
  include AlgoliaSearch
  has_many :blank_indices, dependent: :destroy
  belongs_to :user
  enum :blank_type, {random: 1, noun: 2, verb: 3, adjective: 4, adverb: 5, preposition: 6}
  validates :title, :english_text, :blank_type, presence: true

  scope :title_desc, -> {order(title: :desc)}
  scope :title_asc, -> {order(title: :asc)}
  scope :high_rate, -> {order(correct_answer_rate: :desc)}
  scope :low_rate, -> {order(correct_answer_rate: :asc)}
  scope :latest, -> {order(created_at: :desc)}
  scope :oldest, -> {order(created_at: :asc)}
  scope :default, -> {order(created_at: :desc)}

  algoliasearch do
    attributes :title, :english_text, :japanese_text
  end
end
