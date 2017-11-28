<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 11/19/17
 * Time: 5:26 PM
 */

namespace AppBundle\Twig;

use AppBundle\Service\CachedMasterListReader;
use AppBundle\Service\MasterListServerInfo;
use AppBundle\Service\ServerOfflineException;

class HeaderExtension extends \Twig_Extension
{

    private $currData;

    public function __construct(CachedMasterListReader $masterListReader)
    {
        try {
            $this->currData = $masterListReader->fetch();
        } catch (ServerOfflineException $e) {
            $this->currData = null;
        }
    }

    public function getFunctions() : array
    {
        return array(
          new \Twig_SimpleFunction('server_data', array($this, 'serverData'))
        );
    }

    public function serverData() : ?MasterListServerInfo
    {
        return $this->currData;
    }


}