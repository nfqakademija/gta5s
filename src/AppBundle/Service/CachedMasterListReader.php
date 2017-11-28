<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 11/28/17
 * Time: 7:03 PM
 */

namespace AppBundle\Service;

use Psr\Cache\CacheItemInterface;
use Psr\Cache\CacheItemPoolInterface;

class CachedMasterListReader extends MasterListReader
{

    /**
     * @var CacheItemPoolInterface
     */
    private $cacheItemPool;

    /**
     * @var string
     */
    private $cacheItemName;

    /**
     * @var int
     */
    private $ttl;

    /**
     * CachedMasterListReader constructor.
     *
     * @param string $serverIP
     * @param CurlService $curl
     * @param CacheItemPoolInterface $cacheItemPool
     * @param int $ttl
     * @param string $cachePrefix
     */
    public function __construct(
        string $serverIP,
        CurlService $curl,
        CacheItemPoolInterface $cacheItemPool,
        int $ttl = 60,
        string $cacheItemName = 'RageMP_MLR'
    ) {
        parent::__construct($serverIP, $curl);

        $this->cacheItemPool = $cacheItemPool;
        $this->ttl = $ttl;
        $this->cacheItemName = $cacheItemName;
    }

    /**
     * @throws ServerOfflineException
     * @return MasterListServerInfo
     */
    public function fetch() : MasterListServerInfo
    {

        $cacheItem = $this->getCacheItem();

        if (!$cacheItem->isHit()) {
            $cacheItem->set(parent::fetch());

            $cacheItem->expiresAfter(
                $this->ttl
            );
        }

        return $cacheItem->get();
    }

    /**
     * @return CacheItemPoolInterface
     */
    public function getCacheItemPool() : CacheItemPoolInterface
    {
        return $this->cacheItemPool;
    }

    /**
     * @return string
     */
    public function getCacheItemName() : string
    {
        return $this->cacheItemName;
    }

    /**
     * @return CacheItemInterface
     */
    public function getCacheItem() : CacheItemInterface
    {
        return $this->cacheItemPool->getItem($this->cacheItemName);
    }

    /**
     * Returns lifespan of cache item in seconds.
     *
     * @return int
     */
    public function getCacheTime() : int
    {
        return $this->ttl;
    }
}
