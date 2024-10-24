class CreateProblems < ActiveRecord::Migration[7.1]
  def change
    create_table :problems do |t|
      t.string :title, comment: "タイトル"
      t.string :english_text, comment: "英語の文章"
      t.string :japanese_text, comment: "翻訳された日本語の文章"
      t.integer :correct_answer_rate, comment: "正答率"
      t.integer :blank_type, comment: "穴埋め箇所の種類"
      t.integer :blank_rate, comment: "穴埋めの割合"
      
      t.timestamps
    end
  end
end
