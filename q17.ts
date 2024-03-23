type RockPaperScissors = '👊🏻' | '🖐🏾' | '✌🏽';

type WhoWins<A extends RockPaperScissors, B extends RockPaperScissors> =
	A extends B ? "draw" :
	A extends {"👊🏻": "✌🏽", "🖐🏾": "👊🏻", "✌🏽": "🖐🏾"}[B] ? "win" : "lose";
