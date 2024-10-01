# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_10_01_072006) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "blank_indices", force: :cascade do |t|
    t.integer "index"
    t.bigint "problem_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["problem_id"], name: "index_blank_indices_on_problem_id"
  end

  create_table "problems", force: :cascade do |t|
    t.string "title", comment: "タイトル"
    t.string "english_text", comment: "英語の文章"
    t.string "japanese_text", comment: "翻訳された日本語の文章"
    t.integer "correct_answer_rate", comment: "正答率"
    t.integer "blank_type", comment: "穴埋め箇所の種類"
    t.integer "blank_rate", comment: "穴埋めの割合"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "blank_indices", "problems"
end
