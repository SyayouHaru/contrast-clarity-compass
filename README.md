# Contrast Clarity Compass

（日本語名：コントラスト・クラリティ・コンパス）

WCAG 基準に基づくコントラストチェックツールです。

## 概要

Contrast Clarity Compass は、Web アクセシビリティのためのコントラスト比チェックを簡単に行えるツールです。色の組み合わせが WCAG 基準を満たしているかを素早く確認できます。

## 機能

- 複数の文字色と背景色の設定
- リアルタイムでのコントラスト比計算
- WCAG AA（4.5:1）と AAA（7:1）基準の判定
- 色の名前付け機能
- 設定のエクスポート/インポート機能
- ローカルストレージによる設定の保存
- ダークモード/ライトモードの切り替え

## 技術スタック

- React 18
- Material-UI (MUI) v5
- Emotion (スタイリング)
- JavaScript

## 開発環境のセットアップ

1. リポジトリのクローン

```bash
git clone [repository-url]
cd contrast-clarity-compass
```

2. 依存関係のインストール

```bash
npm install
```

3. 開発サーバーの起動

```bash
npm start
```

## 使用方法

1. 文字色を追加/設定
2. 背景色を追加/設定
3. 各組み合わせのコントラスト比を確認
4. WCAG 基準の達成状況を確認
5. 必要に応じて色の名前を設定
6. 設定をエクスポート/インポート
7. テーマの切り替え（ダークモード/ライトモード）

## プロジェクト構造

```
contrast-clarity-compass/
├── public/              # 静的ファイル
├── src/                 # ソースコード
│   ├── components/      # Reactコンポーネント
│   ├── contexts/        # Reactコンテキスト
│   └── constants/       # 定数定義
├── package.json         # プロジェクト設定
└── README.md           # プロジェクトドキュメント
```

## 注意

基本的に Cursor を使って AI でのコーディングをしているため  
ソース自体は見づらい点がまだ多い状態のです。

## ライセンス

MIT
