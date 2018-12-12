#pragma strict
 
public var gokyuzu : GameObject;
public var toprak : GameObject;
 
public var gokyuzuSagaKaymaHizi : float = 1.0;
 
private var arkaplanSayisi : int;
 
private var kameraUnityEbatlar : Vector2;
private var gokyuzuUnityEbatlar : Vector2;
private var toprakUnityEbatlar : Vector2;
 
private var gokyuzuObjeleri : Transform[];
private var toprakObjeleri : Transform[];
private var bastakiGokyuzuArkaplanObjesi : int = 0;
private var bastakiToprakArkaplanObjesi : int = 0;
 
private var gokyuzuParent : Transform;
 
function Awake()
{
    gokyuzuUnityEbatlar = Vector2( ( gokyuzu.GetComponent.<Renderer>() as SpriteRenderer ).sprite.rect.width, ( gokyuzu.GetComponent.<Renderer>() as SpriteRenderer ).sprite.rect.height ) / 100;
    toprakUnityEbatlar = Vector2( ( toprak.GetComponent.<Renderer>() as SpriteRenderer ).sprite.rect.width, ( toprak.GetComponent.<Renderer>() as SpriteRenderer ).sprite.rect.height ) / 100;
 
    GetComponent.<Camera>().orthographicSize = ( gokyuzuUnityEbatlar.y + toprakUnityEbatlar.y ) / 2;
    arkaplanSayisi = Mathf.CeilToInt( ( GetComponent.<Camera>().orthographicSize * 2 * GetComponent.<Camera>().aspect ) / gokyuzuUnityEbatlar.x ) + 1;
 
    kameraUnityEbatlar = Vector2( GetComponent.<Camera>().orthographicSize * GetComponent.<Camera>().aspect, GetComponent.<Camera>().orthographicSize );
 
    gokyuzuObjeleri = new Transform[ arkaplanSayisi ];
    toprakObjeleri = new Transform[ arkaplanSayisi ];
 
    gokyuzuParent = new GameObject().GetComponent(Transform);
 
    for( var i = 0; i < arkaplanSayisi; i++ )
    {
        var xKoordinati : float = transform.position.x - kameraUnityEbatlar.x + i * gokyuzuUnityEbatlar.x;
        gokyuzuObjeleri[i] = Instantiate( gokyuzu, Vector3( xKoordinati, kameraUnityEbatlar.y, 0 ), Quaternion.identity ).GetComponent( Transform );
        gokyuzuObjeleri[i].parent = gokyuzuParent;
        toprakObjeleri[i] = Instantiate( toprak, Vector3( xKoordinati, kameraUnityEbatlar.y - gokyuzuUnityEbatlar.y, -1 ), Quaternion.identity ).GetComponent( Transform );
    }
}
 
function Update()
{
    if( transform.position.x - kameraUnityEbatlar.x >= gokyuzuObjeleri[bastakiGokyuzuArkaplanObjesi].position.x + gokyuzuUnityEbatlar.x )
    {
        gokyuzuObjeleri[bastakiGokyuzuArkaplanObjesi].localPosition.x += arkaplanSayisi * gokyuzuUnityEbatlar.x;
        bastakiGokyuzuArkaplanObjesi++;
 
        if( bastakiGokyuzuArkaplanObjesi == gokyuzuObjeleri.Length )
            bastakiGokyuzuArkaplanObjesi = 0;
    }
 
    if( transform.position.x - kameraUnityEbatlar.x >= toprakObjeleri[bastakiToprakArkaplanObjesi].position.x + toprakUnityEbatlar.x )
    {
        toprakObjeleri[bastakiToprakArkaplanObjesi].position.x += arkaplanSayisi * gokyuzuUnityEbatlar.x;
        bastakiToprakArkaplanObjesi++;
 
        if( bastakiToprakArkaplanObjesi == gokyuzuObjeleri.Length )
            bastakiToprakArkaplanObjesi = 0;
    }
 
    gokyuzuParent.position.x += gokyuzuSagaKaymaHizi * Time.deltaTime;
}