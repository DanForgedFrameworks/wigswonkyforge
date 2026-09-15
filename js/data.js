/* Wig's Wonky Forge: the photo curation.
   Edit here, nothing else needs touching. Photo names are the original file names from the
   handoff (extension ignored); tools/optimise_images.py makes the matching WebP files.
   First photo = the tile image; the rest cycle on hover. */
window.WWF_DATA = {
  catalogue: [
    ['For the garden', [
      ['Set in Stone', ['ammonite-stakes', 'img-20260529-144932'], 'Garden stakes and pokers with ammonite and fern-curl tops'],
      ['By Hook or by Crook', ['crook-stakes', 'img-20260529-145131', 'crooks', 'img-20260529-144928'], 'Shepherd’s crook stakes and toasting forks'],
      ['Draig Fach', ['dragon-stake', 'img-8281', 'dragon-stake-2', 'forge-finials'], 'Dragon heads: garden stake and fire tools'],
      ['Straight from the Horse’s Mouth', ['horse-head'], 'Horse head garden stake'],
      ['Stake Through the Heart', ['img-8406', 'img-9005', 'heart-stakes', 'img-8408'], 'Heart-topped garden stakes'],
      ['Garden Torches', ['garden-torches', 'img-6454', 'img-8183', 'torch-pair-garden', 'img-6449'], 'Forged garden torch baskets on stakes'],
      ['Hose Hoops', ['img-7912', 'img-7911'], 'Rebar hoops to guide the hose'],
      ['Camping Tripod', ['ct-1', 'ct-2'], 'Forged camping tripod over a fire pit']
    ]],
    ['For the house', [
      ['Ammonite Doorstop', ['ammonite-doorstop-oak', 'ammonite-block-2'], 'Ammonite spiral on an oak block'],
      ['Double, Treble…', ['treble-hooks-pair', 'img-20260528-195507', 'tclo-6', 'trbo-3', 'treble-items'], 'Treble clef hooks, letter opener and bottle opener'],
      ['Take a Paws!', ['img-8882', 'img-8887'], 'Lead hooks stamped with paw prints'],
      ['S Hooks', ['ssh-8', 'ssh-1'], 'Forged S hooks'],
      ['Horseshoe Trivet', ['img-20260528-194713'], 'Three horseshoes forged into a trinity knot'],
      ['Coasters', ['img-8151', 'img-8152'], 'Forged steel coasters'],
      ['Drawer Handles', ['drh-2'], 'Twisted drawer handle on oak'],
      ['Bottle Openers', ['shbo-1', 'bottle-openers', 'shbo-6', 'shbo-4'], 'Seahorse and twisty bottle openers'],
      ['Copper Roses', ['copper-rose', 'copper-roses', 'copper-roses-pair'], 'Copper roses'],
      ['Copper Bookmarks', ['copper-bookmarks-block', 'copper-bookmark-clef'], 'Stamped copper bookmarks']
    ]],
    ['Fire & hearth', [
      ['Copper & Steel Shovel', ['img-8025', 'img-8031', 'img-8039', 'img-8035'], 'Hearth shovel, copper rivets on steel'],
      ['Ammonite Poker', ['afp-2', 'afp-1'], 'Poker and tongs with ammonite handles'],
      ['Treble Fire Set', ['musical-fire-tools', 'fire-tool-stand', 'glowing-treble'], 'Fire tool set with treble clef handles'],
      ['Fire Tools Selection', ['poker-rack'], 'A rack of forged pokers']
    ]],
    ['Jewellery & wearables', [
      ['Oath Bangles', ['bracelet-twist', 'or-2'], 'Twisted steel bangle'],
      ['Copper Bangles & Cuffs', ['cf-2', 'copper-bangles', 'cf-1'], 'Copper cuffs and bangles'],
      ['Fern Curl Pendants', ['fcp-2', 'fcp-1'], 'Fern curl pendants'],
      ['Don’t Be Cross', ['crosses'], 'Forged crosses on leather cords'],
      ['Blanket Pins', ['bsp-3', 'bsp-5', 'bsp-4', 'bsp-1'], 'Penannular blanket pins'],
      ['Hair Pins', ['hbr-1', 'hbr-9'], 'Forged hair pins'],
      ['Viking Range', ['viking-all', 'mkl-1', 'viking-swirl-3', 'trinket-spirals', 'mkl-4'], 'Mjolnirs, swirls, whorls and spirals']
    ]],
    ['Small things & trinkets', [
      ['Meow', ['img-8049', 'cats', 'img-8051', 'mice-cats'], 'Forged cats'],
      ['Squeak of the Devil', ['mouse-tardis', 'mouse-tag', 'img-20260529-144415'], 'Forged mice, one with a TARDIS behind'],
      ['Rebar Critters', ['img-20260528-195814', 'rebar-critter'], 'Snail and critters forged from rebar'],
      ['Skull Heads', ['heads', 'skh-2', 'msh-4'], 'Skull heads'],
      ['I Heart These', ['heart-fence', 'horseshoe-hearts', 'img-20260528-194811', 'forged-hearts', 'hp-1'], 'Hearts of every kind: forged, horseshoe and trinket'],
      ['Mystic Wands', ['mystic-wands'], 'Twisted steel wands'],
      ['Cocktail Stirrer', ['cos-4'], 'Treble clef cocktail stirrer'],
      ['Keyrings', ['keyrings', 'lk-6', 'tckr-2'], 'Forged keyrings, leaves and trebles']
    ]],
    ['Seasonal', [
      ['Candy Canes', ['cc-1', 'cc-2', 'cc-6'], 'Twisted steel candy canes on the tree'],
      ['Icicles', ['ii-4', 'ii-1', 'ii-6'], 'Forged icicles'],
      ['Hook, Line & Twinkle', ['crook-hooks', 'img-20260529-145220'], 'Crook hooks and stocking hangers'],
      ['Ferrous Tree', ['xt-3', 'xt-1', 'xt-5'], 'Tree-shaped hook rack'],
      ['Horseshoe Pumpkins', ['horseshoe-pumpkins'], 'Pumpkins made from horseshoes']
    ]]
  ],

  /* [photo, caption, wide?] — wide tiles span two columns on bigger screens */
  gnomes: [
    ['image-2', 'Gnomes on the anvil', true],
    ['image-5', 'Gnomes, still warm'],
    ['image-8', 'The whole parade'],
    ['ghost-close', 'A ghost, up close'],
    ['gnomes-three', 'Three ghosts'],
    ['gnomes-five', 'Ghosts on the log', true]
  ],

  /* [name, photos, wide?] */
  bespoke: [
    ['The rail at Grounded', ['cafe-rail-wide', 'cafe-rail-bar', 'cafe-rail-room', 'cafe-rail-detail'], true],
    ['Garden torches', ['torch-basket-close', 'img-8184', 'torch-basket-hand', 'img-6450', 'img-8187'], true],
    ['Bird stand', ['stake-scroll-leaf-dew', 'img-9748', 'stake-hook-leaf', 'img-9762', 'stake-crossbar-grass', 'img-9744']],
    ['Dragon(horse)fly', ['dragonfly-horseshoe']],
    ['Treble Fire Set', ['musical-fire-tools', 'fire-tool-stand', 'glowing-treble']],
    ['Collins’ Memorial', ['collins-on-anvil', 'collins-clef', 'collins-memorial']],
    ['Take a Paws!', ['take-a-paws', 'img-8882', 'img-8887']],
    ['Border stakes', ['garden-hoops-close', 'garden-hoops-edging', 'garden-stake-line']],
    ['Hose Hoops', ['img-7912', 'img-7911']]
  ],

  /* [photo, caption, focal point] */
  homes: [
    ['copper-rose-shelf', 'A copper rose, settled in'],
    ['birdstand-home', 'Bird stand, birds fed'],
    ['cafe-rail-room', 'The rail at Grounded, in service'],
    ['garden-stakes-3', 'Border stakes, pinning the edging'],
    ['dragonfly-horseshoe', 'Dragon(horse)fly, landed'],
    ['forged-hearts', 'Forged hearts, hung up'],
    ['treble-heart-wall', 'Collins’ Memorial, home on the wall', 'center 55%']
  ],

  /* [photo, caption] */
  memorial: [
    ['collins-on-anvil', 'Collins’ Memorial resting on the anvil, the heart in its tail catching the light'],
    ['collins-in-hand', 'Wig in the forge holding Collins’ Memorial: a forged treble clef with a heart in its tail'],
    ['collins-memorial', 'Collins’ Memorial, finished'],
    ['collins-clef', 'Collins’ Memorial, the clef'],
    ['treble-heart-wall', 'Collins’ Memorial mounted on the wall in its new home']
  ]
};
