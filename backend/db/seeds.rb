require "faker"

user1 = User.create!(name: "テスト太郎", email: "test1@example.com", password: "password", confirmed_at: Time.current)
user2 = User.create!(name: "テスト次郎", email: "test2@example.com", password: "password", confirmed_at: Time.current)

20.times do |n|
  sample_correct_answer_rate = Faker::Number.between(from: 0, to: 100)
  sample_blank_type = Faker::Number.between(from: 1, to: 6)
  sample_blank_rate = Faker::Number.between(from: 0, to: 100)
  Problem.create!(
    title: "user1#{n+1}",
    english_text: "blanky is a service that allows you to create your own original English questions just by uploading English sentences.",
    japanese_text: "blankyは、英語の文章をアップロードするだけであなただけのオリジナルの英語問題を作成することができるサービスです。",
    correct_answer_rate: sample_correct_answer_rate,
    blank_type: sample_blank_type,
    blank_rate: sample_blank_rate,
    user: user1
  )
  Problem.create!(
    title: "user2#{n+1}",
    english_text: "blanky is a service that allows you to create your own original English questions just by uploading English sentences.",
    japanese_text: "blankyは、英語の文章をアップロードするだけであなただけのオリジナルの英語問題を作成することができるサービスです。",
    correct_answer_rate: sample_correct_answer_rate,
    blank_type: sample_blank_type,
    blank_rate: sample_blank_rate,
    user: user2
  )
end